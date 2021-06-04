import '@/styles/index.css';
import '@/styles/chrome-bug.css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useEffect, FC } from 'react';

const Noop: FC = ({ children }) => <>{children}</>;
export default function NextApp({
	pageProps,
	Component
}: AppProps) {
	const LayoutNoop = (Component as any).LayoutNoop || Noop;
	// remove chrome-bug.css loading class on FCP
	useEffect(() => {
		document.body.classList?.remove('loading');
	}, []);

	return (
		<>
			<LayoutNoop pageProps={pageProps}>
				<Component {...pageProps} />
			</LayoutNoop>
		</>
	);
}

export function reportWebVitals(
	metric: NextWebVitalsMetric
): void {
	switch (metric.name) {
		case 'FCP':
			console.log('FCP: ', metric);
			break;
		case 'LCP':
			console.log('LCP: ', metric);
			break;
		case 'CLS':
			console.log('CLS: ', metric);
			break;
		case 'FID':
			console.log('FID: ', metric);
			break;
		case 'TTFB':
			console.log('TTFB: ', metric);
			break;
		case 'Next.js-hydration':
			console.log('Next.js-hydration: ', metric);
			break;
		case 'Next.js-route-change-to-render':
			console.log('Next.js-route-change-to-render: ', metric);
			break;
		case 'Next.js-render':
			console.log('Next.js-render: ', metric);
			break;
		default:
			break;
	}
}
