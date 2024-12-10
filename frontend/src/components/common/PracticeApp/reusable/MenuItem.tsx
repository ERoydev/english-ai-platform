// This servers as a Menu Item in my Practice app dashboard

import React from 'react';

export default function MenuItem({
    label,
    icon
}: {
    label: string;
    icon: React.ReactElement<SVGAElement>;
}) {
    return(
        <>
            <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            {icon}
            <span className="ms-3">{label}</span>
            </p>
        </>
    );
}