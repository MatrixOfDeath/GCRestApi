<?php

/* @WebProfiler/Collector/router.html.twig */
class __TwigTemplate_4474101226d255a74a7722c10385d40bcfba8957126e175f8449abe3558173aa extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@WebProfiler/Profiler/layout.html.twig", "@WebProfiler/Collector/router.html.twig", 1);
        $this->blocks = array(
            'toolbar' => array($this, 'block_toolbar'),
            'menu' => array($this, 'block_menu'),
            'panel' => array($this, 'block_panel'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@WebProfiler/Profiler/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_5b4eb3bc7e68cbbfab65c1a726d83237f6b444a1c635798c88445a6179c81576 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_5b4eb3bc7e68cbbfab65c1a726d83237f6b444a1c635798c88445a6179c81576->enter($__internal_5b4eb3bc7e68cbbfab65c1a726d83237f6b444a1c635798c88445a6179c81576_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/router.html.twig"));

        $__internal_fc774dc79ab7b4d0a849041375fc481a996d33a45399e40d790b16d2b87835f8 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_fc774dc79ab7b4d0a849041375fc481a996d33a45399e40d790b16d2b87835f8->enter($__internal_fc774dc79ab7b4d0a849041375fc481a996d33a45399e40d790b16d2b87835f8_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/router.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5b4eb3bc7e68cbbfab65c1a726d83237f6b444a1c635798c88445a6179c81576->leave($__internal_5b4eb3bc7e68cbbfab65c1a726d83237f6b444a1c635798c88445a6179c81576_prof);

        
        $__internal_fc774dc79ab7b4d0a849041375fc481a996d33a45399e40d790b16d2b87835f8->leave($__internal_fc774dc79ab7b4d0a849041375fc481a996d33a45399e40d790b16d2b87835f8_prof);

    }

    // line 3
    public function block_toolbar($context, array $blocks = array())
    {
        $__internal_2213f5d7f76fd7c34828aa84a3c3d616aa7f72a973c0b2b9d6824728e66fdda1 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_2213f5d7f76fd7c34828aa84a3c3d616aa7f72a973c0b2b9d6824728e66fdda1->enter($__internal_2213f5d7f76fd7c34828aa84a3c3d616aa7f72a973c0b2b9d6824728e66fdda1_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "toolbar"));

        $__internal_654d15c316cc2a162fad3ebecd8dbc18c8f5a600a3590b83f291ea97aee769f3 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_654d15c316cc2a162fad3ebecd8dbc18c8f5a600a3590b83f291ea97aee769f3->enter($__internal_654d15c316cc2a162fad3ebecd8dbc18c8f5a600a3590b83f291ea97aee769f3_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "toolbar"));

        
        $__internal_654d15c316cc2a162fad3ebecd8dbc18c8f5a600a3590b83f291ea97aee769f3->leave($__internal_654d15c316cc2a162fad3ebecd8dbc18c8f5a600a3590b83f291ea97aee769f3_prof);

        
        $__internal_2213f5d7f76fd7c34828aa84a3c3d616aa7f72a973c0b2b9d6824728e66fdda1->leave($__internal_2213f5d7f76fd7c34828aa84a3c3d616aa7f72a973c0b2b9d6824728e66fdda1_prof);

    }

    // line 5
    public function block_menu($context, array $blocks = array())
    {
        $__internal_b93bdf226e64e71f74155e8c3d562a838c1c1166826e4b123a3a866ab4da2be4 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_b93bdf226e64e71f74155e8c3d562a838c1c1166826e4b123a3a866ab4da2be4->enter($__internal_b93bdf226e64e71f74155e8c3d562a838c1c1166826e4b123a3a866ab4da2be4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "menu"));

        $__internal_738af10be3e1ce61e5f8711af5499bad6cc6f4b826bab5bf17f74032ce29ffda = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_738af10be3e1ce61e5f8711af5499bad6cc6f4b826bab5bf17f74032ce29ffda->enter($__internal_738af10be3e1ce61e5f8711af5499bad6cc6f4b826bab5bf17f74032ce29ffda_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "menu"));

        // line 6
        echo "<span class=\"label\">
    <span class=\"icon\">";
        // line 7
        echo twig_include($this->env, $context, "@WebProfiler/Icon/router.svg");
        echo "</span>
    <strong>Routing</strong>
</span>
";
        
        $__internal_738af10be3e1ce61e5f8711af5499bad6cc6f4b826bab5bf17f74032ce29ffda->leave($__internal_738af10be3e1ce61e5f8711af5499bad6cc6f4b826bab5bf17f74032ce29ffda_prof);

        
        $__internal_b93bdf226e64e71f74155e8c3d562a838c1c1166826e4b123a3a866ab4da2be4->leave($__internal_b93bdf226e64e71f74155e8c3d562a838c1c1166826e4b123a3a866ab4da2be4_prof);

    }

    // line 12
    public function block_panel($context, array $blocks = array())
    {
        $__internal_cd948d2230b8bb0ca332c2bec20648c1c6e816db373888a008cf637efaad7443 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_cd948d2230b8bb0ca332c2bec20648c1c6e816db373888a008cf637efaad7443->enter($__internal_cd948d2230b8bb0ca332c2bec20648c1c6e816db373888a008cf637efaad7443_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        $__internal_2ab91e09b723d99466d7bfcc838b09d39db7e3c311079657cb6d9629587b0bf2 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_2ab91e09b723d99466d7bfcc838b09d39db7e3c311079657cb6d9629587b0bf2->enter($__internal_2ab91e09b723d99466d7bfcc838b09d39db7e3c311079657cb6d9629587b0bf2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        // line 13
        echo "    ";
        echo $this->env->getRuntime('Symfony\Bridge\Twig\Extension\HttpKernelRuntime')->renderFragment($this->env->getExtension('Symfony\Bridge\Twig\Extension\RoutingExtension')->getPath("_profiler_router", array("token" => ($context["token"] ?? $this->getContext($context, "token")))));
        echo "
";
        
        $__internal_2ab91e09b723d99466d7bfcc838b09d39db7e3c311079657cb6d9629587b0bf2->leave($__internal_2ab91e09b723d99466d7bfcc838b09d39db7e3c311079657cb6d9629587b0bf2_prof);

        
        $__internal_cd948d2230b8bb0ca332c2bec20648c1c6e816db373888a008cf637efaad7443->leave($__internal_cd948d2230b8bb0ca332c2bec20648c1c6e816db373888a008cf637efaad7443_prof);

    }

    public function getTemplateName()
    {
        return "@WebProfiler/Collector/router.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  94 => 13,  85 => 12,  71 => 7,  68 => 6,  59 => 5,  42 => 3,  11 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("{% extends '@WebProfiler/Profiler/layout.html.twig' %}

{% block toolbar %}{% endblock %}

{% block menu %}
<span class=\"label\">
    <span class=\"icon\">{{ include('@WebProfiler/Icon/router.svg') }}</span>
    <strong>Routing</strong>
</span>
{% endblock %}

{% block panel %}
    {{ render(path('_profiler_router', { token: token })) }}
{% endblock %}
", "@WebProfiler/Collector/router.html.twig", "/Applications/MAMP/htdocs/GustoCoffee/GustoCoffee/vendor/symfony/symfony/src/Symfony/Bundle/WebProfilerBundle/Resources/views/Collector/router.html.twig");
    }
}
