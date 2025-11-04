
import React from 'react';

const iconProps = {
    className: "w-6 h-6",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "currentColor"
};

export const BookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

export const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.502L16.5 21.75l-.398-1.248a3.375 3.375 0 00-2.455-2.455l-1.248-.398 1.248-.398a3.375 3.375 0 002.455-2.455l.398-1.248.398 1.248a3.375 3.375 0 002.455 2.455l1.248.398-1.248.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
);

export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 01-11.68 0M15.59 14.37A12.021 12.021 0 0021.75 12 12.021 12.021 0 0015.59 14.37zM9.75 14.37a6 6 0 00-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 0011.68 0M9.75 14.37A12.021 12.021 0 012.25 12a12.021 12.021 0 017.5-2.37m0 0v-4.82a6 6 0 015.84-7.38 6 6 0 015.84 7.38v4.82" />
    </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0h.008v.008h-.008v-.008zm-3.75 0h.008v.008h-.008v-.008zm0-2.311a12.06 12.06 0 00-4.5 0m3.75 7.478c-1.116 1.024-2.261 1.505-3.416 1.505C6.097 21 4.5 19.403 4.5 17.5S6.097 14 8.084 14m6.102 6.5c1.116 1.024 2.261 1.505 3.416 1.505 1.987 0 3.584-1.597 3.584-3.5s-1.597-3.5-3.584-3.5m0 0A12.06 12.06 0 0112 14.25a12.06 12.06 0 01-4.186 1.25" />
    </svg>
);

export const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.056-4.329 9.75 9.75 0 018.888 0A9.75 9.75 0 0116.5 18.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25V21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v3.75m0 0a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12 7.5a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0z" />
    </svg>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);
