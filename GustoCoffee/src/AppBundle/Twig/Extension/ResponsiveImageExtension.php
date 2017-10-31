<?php

namespace AppBundle\Twig\Extension;

use Liip\ImagineBundle\Imagine\Cache\CacheManager;

/**
 * Generates a source tag to use inside an responsive picture
 */
class ResponsiveImageExtension extends \Twig_Extension
{
    /**
     * @var CacheManager $cacheManager
     */
    private $cacheManager;

    /**
     * @param $cacheManager
     */
    public function __construct(CacheManager $cacheManager)
    {
        $this->cacheManager = $cacheManager;
    }


    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('responsive_image_source', array($this, 'responsiveImageSourceFilter'), array('is_safe' => array('html'))),
        );
    }

    /**
     * @param string $imageUrl
     * @param array  $widths
     * @param array  $config
     *
     * @return string
     */
    public function responsiveImageSourceFilter($imageUrl, $widths = [], $config = [])
    {
        if (isset($config['media'])) {
            $mediaAttr = sprintf('media="%s"', $config['media']);
        } else {
            $mediaAttr = '';
        }
        $filterSet = isset($config['filterset']) ? $config['filterset'] : 'responsive_image';

        $srcSets = [];
        foreach ($widths as $width) {
            $resizedImageUrl = $this->getImagineUrl($imageUrl, $filterSet, $width);
            $srcSets[] = $resizedImageUrl . " " . $width . "w";
        }
        $srcSets = implode(", ", $srcSets);

        $tag = sprintf('<source srcset="%s" %s />', $srcSets, $mediaAttr);

        return $tag;
    }

    /**
     * @return CacheManager
     */
    public function getCacheManager()
    {
        return $this->cacheManager;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'responsive_image';
    }

    /**
     * @param string $imageUrl
     * @param string $filter
     * @param int    $width
     *
     * @return mixed
     */
    private function getImagineUrl($imageUrl, $filter, $width)
    {
        return $this->cacheManager->getBrowserPath($imageUrl, $filter, ['thumbnail' => ['size' => [0 => $width]]]);
    }
}
