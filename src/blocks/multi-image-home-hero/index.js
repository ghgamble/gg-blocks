import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';
import './style.scss';
import GGBIcon from '../../ggb-icon';

registerBlockType(metadata.name, {
    ...metadata,
    icon: GGBIcon,
    edit: Edit,
    save: Save,
});
