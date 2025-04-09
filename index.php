<?php
use Kirby\Toolkit\Query;
use Kirby\Toolkit\I18n;
use Kirby\Panel\Controller\PageTree;
use Kirby\Cms\App;
use Kirby\Cms\Find;

// Vue component docs : https://getkirby.com/docs/reference/plugins/extensions/sections#vue-component
// 

// Useful for updating related code parts : Kirby/src/Panel/Controller/PageTree.php

Kirby::plugin(
    name: 'daandelange/arborescence',
    info: [
        'license' => 'MIT'
    ],
    version: '1.0.0',
    extends: [
        'sections' => [
            'arborescence' => [
                //'extends' => 'sections/pages',
                'props' => [
                    'label' => function ($label = null) {
                        return I18n::translate($label, $label); // translates lang arrays or keys
                    },
                    'rootPage' => function (?string $rootPage = null) {
                        // Set default dynamically
                        if(!$rootPage){
                            /** @var \Kirby\Cms\Page | Site */
                            $model = $this->model();
                            //return $this->model()->id()??'site';
                            if(!$model->id()) $rootPage = 'site';
                            else $rootPage = $model->id();
                        }

                        // Sanitize
                        if($rootPage!='site'){
                            // Prepend page
                            if(!str_starts_with($rootPage, 'pages/')) $rootPage = 'pages/'.$rootPage;
                        }
                        return $rootPage; // self (page) or site
                    },
                    // Rather to show the parent entry or not 
                    'showParent' => function(bool $showParent = true){
                        return $showParent;
                    }
                ],
                'computed' => [
                    'parentIcon' => function(){
                        /** @var \Kirby\Cms\Page | Site */
                        $model = $this->model();
                        return match (true) {
                            $this instanceof Kirby\Cms\Site => 'home',
                            default                         => $this->model()->panel()->image()['icon'] ?? null
                        };
                    },
                    'parentTitle' => function(){
                        // No root page ? --> set to current content object
                        $root = $this->rootPage();
                        $model = null;
                        if(!$root){
                            /** @var \Kirby\Cms\Page | Site */
                            $model = $this->model();
                        }
                        // Custom object
                        else {
                            $model = Find::parent($root);
                        }

                        if($model){
                            return match (true) {
                                // Site : Match Kirby behaviour.
                                // Todo: rather show site title ?
                                $model instanceof Kirby\Cms\Site => I18n::translate('view.site'),
                                // Any page: show page title
                                default                               => $model->content()->title()->value() ?? I18n::translate('page')
                            };
                            
                        }

                        // Todo: dirty = error speads in UI
                        return 'Invalid rootPage setting !';
                    },
                    'pages' => function () {
                        // The pages object is sent with the initial request.
                        // Note: Otherwise the load triggers another load, which slows down load time and feels buggy
                        return (new PageTree())->children(
                            parent: $this->rootPage(), // App::instance()->request()->get('parent'),
                            moving: null
                        );
                    },
                    'activePage' => function(){
                        return; // disabled since k5 !
                    },
                    'isSite' => function(){
                        return $this instanceof Kirby\Cms\Site;
                    }
                ]
            ]
        ]

    ],
);
