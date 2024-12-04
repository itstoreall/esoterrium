'use client';

import Container from '@/src/components/Container';
import Dashboard from '@/src/components/Page/Dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <Container className={'page-wrapper-container'}>
      <Dashboard />
    </Container>
  );
};
