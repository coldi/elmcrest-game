import React from 'react';
import World from '../world';
import UI from '../ui';
import Event from '../events';
import Combat from '../combat';
import ModalContainer from '../modals';
import { Dialog, ErrorBoundary } from '../common';
import AppLayout from './AppLayout';

export default function App () {
    return (
        <AppLayout>
            <ErrorBoundary scope="World" alert>
                <World />
            </ErrorBoundary>
            <ErrorBoundary scope="UI" alert>
                <UI />
            </ErrorBoundary>
            <ErrorBoundary scope="Event" alert>
                <Event />
            </ErrorBoundary>
            <ErrorBoundary scope="Combat" alert>
                <Combat />
            </ErrorBoundary>
            <ErrorBoundary scope="ModalContainer" alert>
                <ModalContainer component={Dialog} />
            </ErrorBoundary>
        </AppLayout>
    );
}
