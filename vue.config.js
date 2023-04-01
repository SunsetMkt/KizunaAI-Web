module.exports = {
    pwa: {
      manifestOptions: {
        "name": "KizunaAI-Web",
        "short_name": "Kizuna AI",
        "theme_color": "#EE4F87",
        "icons": [
          {
            "src": "./static/ico/icon_x16.png",
            "sizes": "16x16",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon_x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "./static/ico/icon-1024x1024.png",
            "sizes": "1024x1024",
            "type": "image/png"
          },
          {
            "src": "./static/ico/maskable_icon_x16.png",
            "sizes": "16x16",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x32.png",
            "sizes": "32x32",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x48.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon_x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./static/ico/maskable_icon.png",
            "sizes": "1024x1024",
            "type": "image/png",
            "purpose": "maskable"
          },
        ],
        "start_url": ".",
        "display": "standalone",
        "background_color": "#EE4F87"
      },
      name: 'Kizuna AI',
      themeColor: '#EE4F87',
      msTileColor: '#EE4F87',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black-translucent',
      iconPaths: {
        favicon32: 'static/ico/icon_x16.png',
        favicon16: 'static/ico/icon_x32.png',
        appleTouchIcon: 'static/ico/apple-touch-icon-152x152.png',
        maskIcon: 'img/icons/safari-pinned-tab.svg',
        msTileImage: 'static/ico/msapplication-icon-144x144.png'
      },
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        clientsClaim: true,
      },
    }
  }
  