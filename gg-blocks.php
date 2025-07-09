<?php
/**
 * Plugin Name: GG Blocks
 * Description: Custom Gutenberg blocks by GG Dev.
 * Version: 1.0.0
 * Author: Grace Gamble
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function gg_register_blocks() {
    foreach ( glob( __DIR__ . '/build/blocks/*' ) as $block_dir ) {
        register_block_type( $block_dir );
    }
}
add_action( 'init', 'gg_register_blocks' );
