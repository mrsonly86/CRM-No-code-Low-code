import React from 'react';
import Layout from '../components/Layout/Layout';
import LeadsTable from '../components/Leads/LeadsTable';

export default function Leads() {
  return (
    <Layout currentPath="/leads">
      <LeadsTable />
    </Layout>
  );
}