import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';       // Shared styles (frontend + editor)
// import './editor.scss';      // Editor-only styles
import GGBIcon from '../../ggb-icon'; 

registerBlockType(metadata.name, {
  ...metadata,
  icon: GGBIcon,
  edit,
  save,
});
