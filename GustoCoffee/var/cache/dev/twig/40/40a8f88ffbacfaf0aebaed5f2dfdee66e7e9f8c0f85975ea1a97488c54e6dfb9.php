<?php

/* @WebProfiler/Collector/exception.html.twig */
class __TwigTemplate_a611f92a27af130951d9078fddf1bbafe1cc49e2bd58b9706ba15334252c5e8a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@WebProfiler/Profiler/layout.html.twig", "@WebProfiler/Collector/exception.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
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
        $__internal_2747712ac5d3e7cb7a66d05cd2201f0054fb3ec7a11ea8dde9a8be64aa2ac6c9 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_2747712ac5d3e7cb7a66d05cd2201f0054fb3ec7a11ea8dde9a8be64aa2ac6c9->enter($__internal_2747712ac5d3e7cb7a66d05cd2201f0054fb3ec7a11ea8dde9a8be64aa2ac6c9_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/exception.html.twig"));

        $__internal_4aace0bb185931a8024b91f5d64c419ed5daec76221f1650bdecea53b5409929 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_4aace0bb185931a8024b91f5d64c419ed5daec76221f1650bdecea53b5409929->enter($__internal_4aace0bb185931a8024b91f5d64c419ed5daec76221f1650bdecea53b5409929_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/exception.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_2747712ac5d3e7cb7a66d05cd2201f0054fb3ec7a11ea8dde9a8be64aa2ac6c9->leave($__internal_2747712ac5d3e7cb7a66d05cd2201f0054fb3ec7a11ea8dde9a8be64aa2ac6c9_prof);

        
        $__internal_4aace0bb185931a8024b91f5d64c419ed5daec76221f1650bdecea53b5409929->leave($__internal_4aace0bb185931a8024b91f5d64c419ed5daec76221f1650bdecea53b5409929_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_eeef68980888acb71634a2dfe78031f265a21c174af55e3538b686c99e41a3bb = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_eeef68980888acb71634a2dfe78031f265a21c174af55e3538b686c99e41a3bb->enter($__internal_eeef68980888acb71634a2dfe78031f265a21c174af55e3538b686c99e41a3bb_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        $__internal_3be69bb23fd5616bfe11cdde8dbe96acb718a268b83bed7abdf84bf903903510 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_3be69bb23fd5616bfe11cdde8dbe96acb718a268b83bed7abdf84bf903903510->enter($__internal_3be69bb23fd5616bfe11cdde8dbe96acb718a268b83bed7abdf84bf903903510_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    ";
        if ($this->getAttribute(($context["collector"] ?? $this->getContext($context, "collector")), "hasexception", array())) {
            // line 5
            echo "        <style>
            ";
            // line 6
            echo $this->env->getRuntime('Symfony\Bridge\Twig\Extension\HttpKernelRuntime')->renderFragment($this->env->getExtension('Symfony\Bridge\Twig\Extension\RoutingExtension')->getPath("_profiler_exception_css", array("token" => ($context["token"] ?? $this->getContext($context, "token")))));
            echo "
        </style>
    ";
        }
        // line 9
        echo "    ";
        $this->displayParentBlock("head", $context, $blocks);
        echo "
";
        
        $__internal_3be69bb23fd5616bfe11cdde8dbe96acb718a268b83bed7abdf84bf903903510->leave($__internal_3be69bb23fd5616bfe11cdde8dbe96acb718a268b83bed7abdf84bf903903510_prof);

        
        $__internal_eeef68980888acb71634a2dfe78031f265a21c174af55e3538b686c99e41a3bb->leave($__internal_eeef68980888acb71634a2dfe78031f265a21c174af55e3538b686c99e41a3bb_prof);

    }

    // line 12
    public function block_menu($context, array $blocks = array())
    {
        $__internal_1516aaed7552db324cf98fae34c54310d1e6b303a2db7abd71c4a4a74d873160 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_1516aaed7552db324cf98fae34c54310d1e6b303a2db7abd71c4a4a74d873160->enter($__internal_1516aaed7552db324cf98fae34c54310d1e6b303a2db7abd71c4a4a74d873160_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "menu"));

        $__internal_9f15f5c9eba314b66e2edf475db68325b033c58d1a0b31c11f8f445160c7f115 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_9f15f5c9eba314b66e2edf475db68325b033c58d1a0b31c11f8f445160c7f115->enter($__internal_9f15f5c9eba314b66e2edf475db68325b033c58d1a0b31c11f8f445160c7f115_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "menu"));

        // line 13
        echo "    <span class=\"label ";
        echo (($this->getAttribute(($context["collector"] ?? $this->getContext($context, "collector")), "hasexception", array())) ? ("label-status-error") : ("disabled"));
        echo "\">
        <span class=\"icon\">";
        // line 14
        echo twig_include($this->env, $context, "@WebProfiler/Icon/exception.svg");
        echo "</span>
        <strong>Exception</strong>
        ";
        // line 16
        if ($this->getAttribute(($context["collector"] ?? $this->getContext($context, "collector")), "hasexception", array())) {
            // line 17
            echo "            <span class=\"count\">
                <span>1</span>
            </span>
        ";
        }
        // line 21
        echo "    </span>
";
        
        $__internal_9f15f5c9eba314b66e2edf475db68325b033c58d1a0b31c11f8f445160c7f115->leave($__internal_9f15f5c9eba314b66e2edf475db68325b033c58d1a0b31c11f8f445160c7f115_prof);

        
        $__internal_1516aaed7552db324cf98fae34c54310d1e6b303a2db7abd71c4a4a74d873160->leave($__internal_1516aaed7552db324cf98fae34c54310d1e6b303a2db7abd71c4a4a74d873160_prof);

    }

    // line 24
    public function block_panel($context, array $blocks = array())
    {
        $__internal_874a28d0aed534866326fa89d2eae0c9ac9138b8c8a846a9fb31af136aa74880 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_874a28d0aed534866326fa89d2eae0c9ac9138b8c8a846a9fb31af136aa74880->enter($__internal_874a28d0aed534866326fa89d2eae0c9ac9138b8c8a846a9fb31af136aa74880_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        $__internal_5d01aadf66f088c682b4d96a8c0165d6e7c7cd4fa689eb24db63508bebbe9e82 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_5d01aadf66f088c682b4d96a8c0165d6e7c7cd4fa689eb24db63508bebbe9e82->enter($__internal_5d01aadf66f088c682b4d96a8c0165d6e7c7cd4fa689eb24db63508bebbe9e82_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        // line 25
        echo "    <h2>Exceptions</h2>

    ";
        // line 27
        if ( !$this->getAttribute(($context["collector"] ?? $this->getContext($context, "collector")), "hasexception", array())) {
            // line 28
            echo "        <div class=\"empty\">
            <p>No exception was thrown and caught during the request.</p>
        </div>
    ";
        } else {
            // line 32
            echo "        <div class=\"sf-reset\">
            ";
            // line 33
            echo $this->env->getRuntime('Symfony\Bridge\Twig\Extension\HttpKernelRuntime')->renderFragment($this->env->getExtension('Symfony\Bridge\Twig\Extension\RoutingExtension')->getPath("_profiler_exception", array("token" => ($context["token"] ?? $this->getContext($context, "token")))));
            echo "
        </div>
    ";
        }
        
        $__internal_5d01aadf66f088c682b4d96a8c0165d6e7c7cd4fa689eb24db63508bebbe9e82->leave($__internal_5d01aadf66f088c682b4d96a8c0165d6e7c7cd4fa689eb24db63508bebbe9e82_prof);

        
        $__internal_874a28d0aed534866326fa89d2eae0c9ac9138b8c8a846a9fb31af136aa74880->leave($__internal_874a28d0aed534866326fa89d2eae0c9ac9138b8c8a846a9fb31af136aa74880_prof);

    }

    public function getTemplateName()
    {
        return "@WebProfiler/Collector/exception.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  138 => 33,  135 => 32,  129 => 28,  127 => 27,  123 => 25,  114 => 24,  103 => 21,  97 => 17,  95 => 16,  90 => 14,  85 => 13,  76 => 12,  63 => 9,  57 => 6,  54 => 5,  51 => 4,  42 => 3,  11 => 1,);
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

{% block head %}
    {% if collector.hasexception %}
        <style>
            {{ render(path('_profiler_exception_css', { token: token })) }}
        </style>
    {% endif %}
    {{ parent() }}
{% endblock %}

{% block menu %}
    <span class=\"label {{ collector.hasexception ? 'label-status-error' : 'disabled' }}\">
        <span class=\"icon\">{{ include('@WebProfiler/Icon/exception.svg') }}</span>
        <strong>Exception</strong>
        {% if collector.hasexception %}
            <span class=\"count\">
                <span>1</span>
            </span>
        {% endif %}
    </span>
{% endblock %}

{% block panel %}
    <h2>Exceptions</h2>

    {% if not collector.hasexception %}
        <div class=\"empty\">
            <p>No exception was thrown and caught during the request.</p>
        </div>
    {% else %}
        <div class=\"sf-reset\">
            {{ render(path('_profiler_exception', { token: token })) }}
        </div>
    {% endif %}
{% endblock %}
", "@WebProfiler/Collector/exception.html.twig", "/Applications/MAMP/htdocs/GustoCoffee/GustoCoffee/vendor/symfony/symfony/src/Symfony/Bundle/WebProfilerBundle/Resources/views/Collector/exception.html.twig");
    }
}
