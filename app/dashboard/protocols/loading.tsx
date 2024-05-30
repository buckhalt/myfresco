import ResponsiveContainer from '~/components/ResponsiveContainer';
import { DataTableSkeleton } from '~/components/data-table/data-table-skeleton';
import Section from '~/components/layout/Section';
import { PageHeaderSkeleton } from '~/components/ui/typography/PageHeader';

export default function Loading() {
  return (
    <>
      <ResponsiveContainer>
        <PageHeaderSkeleton />
      </ResponsiveContainer>
      <ResponsiveContainer maxWidth="6xl">
        <Section>
          <DataTableSkeleton columnCount={5} filterableColumnCount={3} />
        </Section>
      </ResponsiveContainer>
    </>
  );
}