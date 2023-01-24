import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { IssuesTableData } from 'src/features/issues/components/IssuesTable';

export default function IssueBodyExpand({ body }: IssuesTableData) {
	return <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>;
}
