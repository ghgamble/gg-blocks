import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
    const {
        backgroundColor = '#ffffff',
        accentColor = '#6366f1',
        yearColor       = '#111111',
        eventColor      = '#111111',
        descColor       = '#64748b', 
        yearFontSize    = 18,
        eventFontSize   = 13,
        descFontSize    = 12,
        items           = [],
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'ggb-timeline',
        style: { backgroundColor },
        role: 'region',
        'aria-label': 'Timeline',
    } );

    return (
        <div { ...blockProps }>
            <div className="ggb-timeline__track">
                { items.map( ( item, index ) => (
                    <div className="ggb-timeline__item" key={ index }>
                        <span
                            className="ggb-timeline__year"
                            style={ { color: yearColor, fontSize: yearFontSize } }
                        >
                            { item.year }
                        </span>
                        <div
                            className="ggb-timeline__dot"
                            style={ { backgroundColor: accentColor, borderColor: accentColor } }
                        />
                        <span
                            className="ggb-timeline__event"
                            style={ { color: eventColor, fontSize: eventFontSize } }
                        >
                            { item.event }
                        </span>
                        <span
                            className="ggb-timeline__desc"
                            style={ { color: descColor, fontSize: descFontSize } }
                        >
                            { item.desc }
                        </span>
                    </div>
                ) ) }
            </div>
        </div>
    );
}