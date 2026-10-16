import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/config/routes.config';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFoundPage } from '@/pages/NotFoundPage';
import styles from './ErrorPage.module.css';

const getErrorMessage = (error: unknown) => {
    if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`;
    if (error instanceof Error) return error.message;
    return String(error);
};

const ServerError: React.FC<{ error: unknown }> = ({ error }) => {
    usePageMeta({ title: 'Ошибка', noindex: true });

    return (
        <ErrorState
            code="500"
            title={STATUS_MESSAGES.pages.serverError.title}
            description={STATUS_MESSAGES.pages.serverError.description}
            actions={
                <>
                    <Button onClick={() => window.location.reload()}>{STATUS_MESSAGES.common.reload}</Button>
                    <Button href={ROUTES.HOME} variant="outline">{STATUS_MESSAGES.common.toHome}</Button>
                </>
            }
        >
            {import.meta.env.DEV && <pre className={styles.details}>{getErrorMessage(error)}</pre>}
        </ErrorState>
    );
};

export const ErrorPage: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFoundPage />;
    }

    return <ServerError error={error} />;
};

export const RootErrorPage: React.FC = () => (
    <main className={`container ${styles.root}`}>
        <ErrorPage />
    </main>
);
