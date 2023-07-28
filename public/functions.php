<?php
// meta
function echo_meta($name){
  global $post;

  switch($name){
    case 'title':
      if(is_home()){
        $title = get_bloginfo('name');
      }else{
        $title = get_post_meta($post->ID, 'meta_title', true);

        if(empty($title)){
          $title = wp_title('', false);
        }

        $title .= ' | ' . get_bloginfo('name');
      }

      echo $title;

      break;
    case 'description':
      $description = get_bloginfo('description');

      echo $description;

      break;
    case 'og_url':
      if(is_home()){
        $og_url = 'https://example.com';
      }else{
        $og_url = get_permalink($post->id);
      }

      echo $og_url;

      break;
    case 'og_image':
      $og_image = bloginfo('template_url').'/assets/img/og_image.png';

      echo $og_image;

      break;
  }
}

// 管理画面の項目削除
function remove_menus () {
  if(!current_user_can('administrator')){
    remove_menu_page('index.php'); // ダッシュボード
    remove_menu_page('edit.php'); // 投稿
    //remove_menu_page('upload.php'); // メディア
    //remove_menu_page('edit.php?post_type=page'); // 固定ページ
    remove_menu_page('edit-comments.php'); // コメント
    remove_menu_page('themes.php'); // 外観
    remove_menu_page('plugins.php'); // プラグイン
    remove_menu_page('users.php'); // ユーザー
    remove_menu_page('tools.php'); // ツール
    remove_menu_page('edit.php?post_type=acf-field-group'); // カスタムフィールド
    //remove_menu_page('options-general.php'); // 設定
  }
}
add_action('admin_menu', 'remove_menus');

// wp_headの整理
remove_action('wp_head', 'wp_resource_hints', 2);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles' );
remove_action('admin_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_oembed_add_host_js');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', '_wp_render_title_tag', 1);
function my_delete_plugin_files(){
  wp_deregister_script('jquery');
  wp_dequeue_style('wp-pagenavi');
  wp_dequeue_style('wp-rest-filter');
}
add_action('wp_enqueue_scripts', 'my_delete_plugin_files');
function wps_deregister_styles(){
  wp_dequeue_style('wp-block-library');
}
add_action('wp_print_styles', 'wps_deregister_styles', 100);
function remove_dns_prefetch( $hints, $relation_type ) {
	if ( 'dns-prefetch' === $relation_type ) {
		return array_diff( wp_dependencies_unique_hosts(), $hints );
	}
	return $hints;
}
?>
