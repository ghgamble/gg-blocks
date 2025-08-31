<?php
/**
 * Plugin Name: GG Blocks
 * Description: Custom Gutenberg blocks by GG Dev.
 * Version: 1.0.3
 * Author: Grace Gamble
 * Text Domain: gg-blocks
 */

if ( ! defined( 'ABSPATH' ) ) exit;

$api_key_file = plugin_dir_path( __FILE__ ) . 'map-api-key.php';
if ( file_exists( $api_key_file ) ) {
	require_once $api_key_file;
}

// ✅ Register all blocks from /build/blocks/*
add_action( 'init', function () {
	foreach ( glob( plugin_dir_path( __FILE__ ) . 'build/blocks/*' ) as $block_dir ) {
		register_block_type( $block_dir );
	}
});

// ✅ Register "gg-blocks" category if not already added
add_filter( 'block_categories_all', function( $categories ) {
	$has_gg_blocks = array_filter( $categories, function( $category ) {
		return $category['slug'] === 'gg-blocks';
	});

	if ( ! $has_gg_blocks ) {
		array_unshift( $categories, array(
			'slug'  => 'gg-blocks',
			'title' => 'GG Blocks',
			'icon'  => null, // Icon added in JS
		));
	}

	return $categories;
}, 10, 2 );

// ✅ Inject global JS vars (logo path + Google Maps API key) into editor
add_action( 'enqueue_block_editor_assets', function () {
	wp_register_script( 'gg-block-globals', '', [], null, true );

	wp_add_inline_script( 'gg-block-globals', sprintf(
		'window.ggBlockAssets = { logo: "%s" };',
		esc_url( plugins_url( 'src/gg-dev.svg', __FILE__ ) )
	));

	wp_enqueue_script( 'gg-block-globals' );

	$google_maps_key = defined('GG_MAPS_API_KEY') ? GG_MAPS_API_KEY : '';

	wp_add_inline_script(
		'wp-block-editor',
		'window.ggBlocks = window.ggBlocks || {}; window.ggBlocks.googleMapsApiKey = "' . esc_js($google_maps_key) . '";',
		'before'
	);
});


// ✅ Inject Google Maps API key into frontend for view.js
add_action( 'wp_enqueue_scripts', function () {
	wp_register_script( 'gg-block-globals', '', [], null, true );

	$google_maps_key = defined('GG_MAPS_API_KEY') ? GG_MAPS_API_KEY : '';

	wp_add_inline_script( 'gg-block-globals',
		'window.ggBlocks = window.ggBlocks || {}; window.ggBlocks.googleMapsApiKey = "' . esc_js($google_maps_key) . '";',
		'before'
	);

	wp_enqueue_script( 'gg-block-globals' );
});

