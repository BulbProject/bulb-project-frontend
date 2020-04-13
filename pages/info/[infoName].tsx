import fs from 'fs';
import path from 'path';
import util from 'util';

import React from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import { Cell, Grid } from 'ustudio-ui';

import ReactMarkdown from 'react-markdown';
import { renderers } from '../../components/markdown/renderers';

import { kebabCaseToSentenceCase } from '../../utils';

interface InfoPageProps {
  page: {
    content: string;
    name: string;
  } | null;
}

const InfoPage: NextPage<InfoPageProps> = ({ page }) => {
  if (!page) {
    // @TODO need add error Page 404
    return <div>Error</div>;
  }

  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>

      <Grid isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          <ReactMarkdown escapeHtml={false} source={page.content} renderers={renderers} />
        </Cell>
      </Grid>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const readDir = util.promisify(fs.readdir);

  let paths: { params: { infoName: string } }[] = [];

  try {
    const files = await readDir(path.resolve(process.cwd(), 'info'), { withFileTypes: true });

    paths = files.map(({ name }) => ({
      params: {
        infoName: name.replace(/\.md/, ''),
      },
    }));
  } catch (e) {
    console.log(e);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { infoName: string }> = async ({ params }) => {
  const readFile = util.promisify(fs.readFile);

  try {
    const content = await readFile(path.resolve(process.cwd(), `info/${params?.infoName}.md`), { encoding: 'utf-8' });

    return {
      props: {
        page: {
          name: kebabCaseToSentenceCase(params?.infoName as string),
          content,
        },
      },
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        page: null,
      },
    };
  }
};

export default InfoPage;
