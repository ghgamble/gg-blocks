import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    ColorPalette,
    RangeControl,
    TextControl,
    Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DEFAULT_ATTRS = {
    backgroundColor: '#ffffff',
    accentColor: '#64748b',  
    yearColor: '#111111',     
    eventColor: '#111111',    
    descColor: '#6b7280',     
    yearFontSize: 18,
    eventFontSize: 13,
    descFontSize: 12,
};

export default function Edit( { attributes, setAttributes } ) {
    const {
        backgroundColor = DEFAULT_ATTRS.backgroundColor,
        accentColor     = DEFAULT_ATTRS.accentColor,
        yearColor       = DEFAULT_ATTRS.yearColor,
        eventColor      = DEFAULT_ATTRS.eventColor,
        descColor       = DEFAULT_ATTRS.descColor,
        yearFontSize    = DEFAULT_ATTRS.yearFontSize,
        eventFontSize   = DEFAULT_ATTRS.eventFontSize,
        descFontSize    = DEFAULT_ATTRS.descFontSize,
        items           = [],
    } = attributes;

    const blockProps = useBlockProps( {
        className: 'ggb-timeline',
        style: { backgroundColor },
        role: 'region',
        'aria-label': __( 'Timeline', 'gg-blocks' ),
    } );

    function updateItem( index, key, value ) {
        const updated = items.map( ( item, i ) =>
            i === index ? { ...item, [ key ]: value } : item
        );
        setAttributes( { items: updated } );
    }

    function addItem() {
        setAttributes( {
            items: [ ...items, { year: '', event: '', desc: '' } ],
        } );
    }

    function removeItem( index ) {
        setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
    }

    return (
        <>
            <InspectorControls>

                <PanelBody title={ __( 'Background Color', 'gg-blocks' ) } initialOpen={ true }>
                    <ColorPalette
                        value={ backgroundColor }
                        onChange={ ( color ) => setAttributes( { backgroundColor: color } ) }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Accent / Line Color', 'gg-blocks' ) } initialOpen={ false }>
                    <ColorPalette
                        value={ accentColor }
                        onChange={ ( color ) => setAttributes( { accentColor: color } ) }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Text Colors', 'gg-blocks' ) } initialOpen={ false }>
                    <p style={ { marginBottom: '0.5rem', fontWeight: 600 } }>{ __( 'Year', 'gg-blocks' ) }</p>
                    <ColorPalette
                        value={ yearColor }
                        onChange={ ( color ) => setAttributes( { yearColor: color } ) }
                    />
                    <p style={ { marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 600 } }>{ __( 'Event title', 'gg-blocks' ) }</p>
                    <ColorPalette
                        value={ eventColor }
                        onChange={ ( color ) => setAttributes( { eventColor: color } ) }
                    />
                    <p style={ { marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 600 } }>{ __( 'Description', 'gg-blocks' ) }</p>
                    <ColorPalette
                        value={ descColor }
                        onChange={ ( color ) => setAttributes( { descColor: color } ) }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Font Sizes', 'gg-blocks' ) } initialOpen={ false }>
                    <RangeControl
                        label={ __( 'Year', 'gg-blocks' ) }
                        value={ yearFontSize }
                        onChange={ ( val ) => setAttributes( { yearFontSize: val } ) }
                        min={ 10 }
                        max={ 48 }
                    />
                    <RangeControl
                        label={ __( 'Event title', 'gg-blocks' ) }
                        value={ eventFontSize }
                        onChange={ ( val ) => setAttributes( { eventFontSize: val } ) }
                        min={ 10 }
                        max={ 36 }
                    />
                    <RangeControl
                        label={ __( 'Description', 'gg-blocks' ) }
                        value={ descFontSize }
                        onChange={ ( val ) => setAttributes( { descFontSize: val } ) }
                        min={ 10 }
                        max={ 28 }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Timeline Items', 'gg-blocks' ) } initialOpen={ true }>
                    { items.map( ( item, index ) => (
                        <div
                            key={ index }
                            style={ {
                                borderBottom: '1px solid #e0e0e0',
                                paddingBottom: '1rem',
                                marginBottom: '1rem',
                            } }
                        >
                            <p style={ { fontWeight: 600, marginBottom: '0.5rem' } }>
                                { __( 'Item', 'gg-blocks' ) } { index + 1 }
                            </p>
                            <TextControl
                                label={ __( 'Year / Label', 'gg-blocks' ) }
                                value={ item.year }
                                onChange={ ( val ) => updateItem( index, 'year', val ) }
                            />
                            <TextControl
                                label={ __( 'Event title', 'gg-blocks' ) }
                                value={ item.event }
                                onChange={ ( val ) => updateItem( index, 'event', val ) }
                            />
                            <TextControl
                                label={ __( 'Description', 'gg-blocks' ) }
                                value={ item.desc }
                                onChange={ ( val ) => updateItem( index, 'desc', val ) }
                            />
                            { items.length > 1 && (
                                <Button
                                    isDestructive
                                    variant="link"
                                    onClick={ () => removeItem( index ) }
                                >
                                    { __( 'Remove item', 'gg-blocks' ) }
                                </Button>
                            ) }
                        </div>
                    ) ) }
                    <Button variant="secondary" onClick={ addItem }>
                        { __( '+ Add item', 'gg-blocks' ) }
                    </Button>
                </PanelBody>

            </InspectorControls>

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
        </>
    );
}