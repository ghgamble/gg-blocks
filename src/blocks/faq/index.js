import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';
import GGBIcon from '../../ggb-icon'; 

registerBlockType(metadata.name, {
    ...metadata,
    icon: GGBIcon,
    edit,
    save,
});
