import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';
import GGBIcon from '../../ggb-icon'; // path depends on where this file lives

// ✅ Add this line to confirm it's running
console.log('✅ Registering:', {
  name: metadata.name,
  category: metadata.category,
  icon: GGBIcon
});

registerBlockType(metadata.name, {
  ...metadata,
  icon: GGBIcon,
  edit,
  save,
});
