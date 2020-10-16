import React, { FC, useEffect, useState } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import useAsync from 'honks/use-async';

import download from 'downloadjs';
import { Criterion, Requirement } from 'ts4ocds/extensions/requirements';

import Alert from 'ustudio-ui/components/Alert';

import { v4 } from 'uuid';

import type { AvailableVariant, SelectedVariant } from 'shared/entity/data';
import { useApi } from 'core/context/api-provider';
import { useCategory } from 'core/context/category-provider';
import { modes } from './entity';
import { FormModal } from './form-modal';
import { IdModal } from './id-modal';

const generateSelectedVariant = ({
  availableVariant,
  requirement,
}: {
  availableVariant: AvailableVariant;
  requirement?: Requirement;
}): SelectedVariant => {
  const { criteria: _, ...restAvailableVariants } = availableVariant;

  if (requirement === undefined) {
    return { ...restAvailableVariants };
  }

  return {
    ...restAvailableVariants,
    requirementResponses: [
      {
        id: v4(),
        value: requirement.expectedValue,
        requirement: {
          id: requirement.id,
        },
      },
    ],
  };
};

const formatDateTime = (): string => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const toDouble = (number: number): string => (number < 10 ? `0${number}` : `${number}`);

  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${day}.${toDouble(month)}.${year} ${hour}_${toDouble(minute)}_${toDouble(second)}`;
};

export const Specification: FC<{
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  criterion?: Criterion;
  availableVariant: AvailableVariant;
  categoryTitle: string;
  // eslint-disable-next-line sonarjs/cognitive-complexity
}> = ({ isOpen, setOpen, criterion, availableVariant, categoryTitle }) => {
  const {
    category: { id: categoryId },
    version,
  } = useCategory();

  const [requirement, setRequirement] = useState(criterion?.requirementGroups[0].requirements[0]);
  const [mode, setMode] = useState(modes[0].value);

  const { postSpecificationConfig } = useApi();

  const { result, isResolved, isRejected, call: postSpecification } = useAsync<string | { id: string }>(async () => {
    const { data } = await axios(
      postSpecificationConfig({
        categoryId,
        version,
        mode,
        body: {
          selectedVariant: generateSelectedVariant({
            availableVariant,
            requirement,
          }),
        },
      })
    );

    return data;
  });

  const [identifier, setIdentifier] = useState<string>('');
  const [isDownloading, setDownloading] = useState(false);
  const [isCopying, setCopying] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const isLoading = isDownloading || isCopying;

  const { t } = useTranslation('specification');

  useEffect(
    function onRejection() {
      if (isRejected(result)) {
        setDownloading(false);
        setAlertOpen(true);
        setOpen(false);

        const timer = setTimeout(() => setAlertOpen(false), 2 * 1000);

        return () => clearTimeout(timer);
      }
    },
    [result]
  );

  useEffect(
    function prepareSpecification() {
      if (isLoading) {
        postSpecification();
      }
    },
    [isCopying, isDownloading]
  );

  useEffect(
    function ddcumentDownloading() {
      if (isResolved(result) && isDownloading && mode === 'docx') {
        download(
          result.data as string,
          `${t('specification-for')} ${categoryTitle} ${t('from-date')} ${formatDateTime()}.docx`
        );

        setDownloading(false);
        setAlertOpen(true);
        setOpen(false);
        const timer = setTimeout(() => setAlertOpen(false), 2 * 1000);

        return () => clearTimeout(timer);
      }
    },
    [result, mode]
  );

  useEffect(
    function idCopying() {
      if (isResolved(result) && isCopying) {
        setIdentifier((result.data as { id: string }).id);
        setOpen(false);
      }
    },
    [isCopying, result]
  );

  return (
    <>
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          onChange={() => setAlertOpen(false)}
          verticalPosition={mode === 'json' ? 'top' : 'bottom'}
          horizontalPosition={mode === 'json' ? 'center' : 'left'}
          intent={isRejected(result) ? 'negative' : 'positive'}
          styled={{
            Alert: css`
              z-index: calc(var(--l-topmost) + 2);
            `,
          }}
        >
          {isRejected(result) ? t('something-went-wrong') : t('success')}
        </Alert>
      )}

      <FormModal
        isOpen={isOpen}
        isLoading={isLoading}
        isRejected={isRejected(result)}
        requirement={requirement}
        criterion={criterion}
        mode={mode}
        setOpen={setOpen}
        setDownloading={setDownloading}
        setRequirement={setRequirement}
        setMode={setMode}
        setCopying={setCopying}
      />

      <IdModal
        identifier={identifier}
        isCopying={isCopying}
        setCopying={setCopying}
        setAlertOpen={setAlertOpen}
        setIdentifier={setIdentifier}
      />
    </>
  );
};
