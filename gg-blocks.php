<?php
/**
 * Plugin Name: GG Blocks
 * Description: Custom Gutenberg blocks by GG Dev.
 * Version: 1.0.0
 * Author: Grace Gamble
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ✅ Register all blocks from /build/blocks/*
add_action( 'init', function () {
	foreach ( glob( __DIR__ . '/build/blocks/*' ) as $block_dir ) {
		register_block_type( $block_dir );
	}
});

// ✅ Register "gg-blocks" category so WP knows where to group blocks
add_filter( 'block_categories_all', function( $categories ) {
	$has_gg_blocks = array_filter( $categories, function( $category ) {
		return $category['slug'] === 'gg-blocks';
	});

	if ( ! $has_gg_blocks ) {
		array_unshift( $categories, array(
			'slug'  => 'gg-blocks',
			'title' => 'GG Blocks',
			'icon'  => null, // Icon handled in JS with registerBlockType
		));
	}

	return $categories;
}, 10, 2 );

// ✅ Inject global JS vars (optional)
add_action( 'enqueue_block_editor_assets', function () {
	wp_register_script(
		'gg-block-globals',
		'', // no src needed
		[],
		null,
		true
	);

	wp_add_inline_script(
		'gg-block-globals',
		'window.ggBlockAssets = {
			logo: "' . esc_url( plugins_url( 'src/gg-dev.svg', __FILE__ ) ) . '"
		};'
	);

	wp_enqueue_script('gg-block-globals');
});
