<?php
/**
 * Plugin Name: GG Blocks
 * Description: Custom Gutenberg blocks by GG Dev.
 * Version: 1.0.0
 * Author: Grace Gamble
 * Text Domain: gg-blocks
 */

if ( ! defined( 'ABSPATH' ) ) exit;

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

// ✅ Inject global JS vars (logo path for use in blocks)
add_action( 'enqueue_block_editor_assets', function () {
	wp_register_script( 'gg-block-globals', '', [], null, true );

	wp_add_inline_script( 'gg-block-globals', sprintf(
		'window.ggBlockAssets = { logo: "%s" };',
		esc_url( plugins_url( 'src/gg-dev.svg', __FILE__ ) )
	));

	wp_enqueue_script( 'gg-block-globals' );
});
