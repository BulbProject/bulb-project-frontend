import React, { FC, useEffect, useState } from 'react';
import { css } from 'styled-components';

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
  requirement: Requirement;
}): SelectedVariant => {
  const { criteria: _, ...restAvailableVariants } = availableVariant;

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
  criterion: Criterion;
  availableVariant: AvailableVariant;
  categoryTitle: string;
}> = ({ isOpen, setOpen, criterion, availableVariant, categoryTitle }) => {
  const {
    category: { id: categoryId },
    version,
  } = useCategory();

  const [requirement, setRequirement] = useState(criterion.requirementGroups[0].requirements[0]);
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

  const [identificator, setIdentificator] = useState<string>('');
  const [isDownloading, setDownloading] = useState(false);
  const [isCopying, setCopying] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (isDownloading || isCopying) {
      postSpecification();
    }
  }, [isDownloading, isCopying]);

  useEffect(() => {
    if (isDownloading && isResolved(result)) {
      download(result.data as string, `Специфікация на '${categoryTitle}' від ${formatDateTime()}.docx`);

      setDownloading(false);
      setOpen(false);

      setAlertOpen(true);
    }
  }, [isDownloading, isResolved(result)]);

  useEffect(() => {
    if (isCopying && isResolved(result)) {
      setIdentificator((result.data as { id: string }).id);

      setAlertOpen(true);
    }
  }, [isCopying, isResolved(result)]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isAlertOpen && mode === 'docx') {
      const alertTimeout = setTimeout(() => setAlertOpen(false), 5 * 1000);

      return () => clearTimeout(alertTimeout);
    }
  }, [isAlertOpen, mode]);

  useEffect(() => {
    if (isCopying) {
      setAlertOpen(true);
    }
  }, [isCopying]);

  return (
    <>
      {!isOpen && (
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
          {isRejected(result) ? 'Упс, щось пішло не так...' : 'Успіх!'}
        </Alert>
      )}

      <FormModal
        isOpen={isOpen}
        isDownloading={isDownloading}
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
        identificator={identificator}
        isCopying={isCopying}
        setCopying={setCopying}
        setAlertOpen={setAlertOpen}
        setIdentificator={setIdentificator}
      />
    </>
  );
};
