export default function TableBody ({ value = [], style = {} }) {
    if (value.length === 0) throw new Error('TableBody requires a value array with at least one element');
    return (
        <tbody>
            {value.map((item, index) => (
                <tr key={index} className={{...style}}>
                    {Object.values(item).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default function TableHead ({ value = [], style = {} }) {
    if (value.length === 0) throw new Error('TableHead requires a value array with at least one element');

    return (
        <thead>
            <tr className={{...style}}>
                {value.map((cell, index) => (
                    <th key={index}>{cell}</th>
                ))}
            </tr>
        </thead>
    );
}

export default function TableFooter ({ value = [], style = {} }) {
    if (value.length === 0) throw new Error('TableFooter requires a value array with at least one element');

    return (
        <tfoot>
            <tr className={{...style}}>
                {value.map((cell, index) => (
                    <th key={index}>{cell}</th>
                ))}
            </tr>
        </tfoot>
    );
}