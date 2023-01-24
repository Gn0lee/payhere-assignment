import type { RepositoryTableData } from 'src/features/repository/components/RepositoryTable';

export default function RepositoryDescriptionExpand({ description }: RepositoryTableData) {
	return <p>{description}</p>;
}
