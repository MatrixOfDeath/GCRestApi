<?php

/* base.html.twig */
class __TwigTemplate_0f7392102991309cf27a0a919ffad8cb4a1ac73166363ccbc7b612edd07f4f0c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'body' => array($this, 'block_body'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_e1b96c429f191abe88c7396a082eb87fe892e207629a3958f4075e9ad35c9e97 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_e1b96c429f191abe88c7396a082eb87fe892e207629a3958f4075e9ad35c9e97->enter($__internal_e1b96c429f191abe88c7396a082eb87fe892e207629a3958f4075e9ad35c9e97_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "base.html.twig"));

        $__internal_0c79c12c2d9de93514e6ede6342067d51cca018f92024c22e22165f72409a177 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_0c79c12c2d9de93514e6ede6342067d51cca018f92024c22e22165f72409a177->enter($__internal_0c79c12c2d9de93514e6ede6342067d51cca018f92024c22e22165f72409a177_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "base.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        ";
        // line 6
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 7
        echo "        <link rel=\"icon\" type=\"image/x-icon\" href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('Symfony\Bridge\Twig\Extension\AssetExtension')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
    </head>
    <body>
        ";
        // line 10
        $this->displayBlock('body', $context, $blocks);
        // line 11
        echo "        ";
        $this->displayBlock('javascripts', $context, $blocks);
        // line 12
        echo "    </body>
</html>
";
        
        $__internal_e1b96c429f191abe88c7396a082eb87fe892e207629a3958f4075e9ad35c9e97->leave($__internal_e1b96c429f191abe88c7396a082eb87fe892e207629a3958f4075e9ad35c9e97_prof);

        
        $__internal_0c79c12c2d9de93514e6ede6342067d51cca018f92024c22e22165f72409a177->leave($__internal_0c79c12c2d9de93514e6ede6342067d51cca018f92024c22e22165f72409a177_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_0f4ca55eecb6ec83242c55289c61d2af99c52f22167ce5dd8baaa9b3c15c1335 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_0f4ca55eecb6ec83242c55289c61d2af99c52f22167ce5dd8baaa9b3c15c1335->enter($__internal_0f4ca55eecb6ec83242c55289c61d2af99c52f22167ce5dd8baaa9b3c15c1335_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        $__internal_c53e6b29e4ce6df955effae4503a9da3e805f0c38797ac4f19eb8cb15758548e = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_c53e6b29e4ce6df955effae4503a9da3e805f0c38797ac4f19eb8cb15758548e->enter($__internal_c53e6b29e4ce6df955effae4503a9da3e805f0c38797ac4f19eb8cb15758548e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Welcome!";
        
        $__internal_c53e6b29e4ce6df955effae4503a9da3e805f0c38797ac4f19eb8cb15758548e->leave($__internal_c53e6b29e4ce6df955effae4503a9da3e805f0c38797ac4f19eb8cb15758548e_prof);

        
        $__internal_0f4ca55eecb6ec83242c55289c61d2af99c52f22167ce5dd8baaa9b3c15c1335->leave($__internal_0f4ca55eecb6ec83242c55289c61d2af99c52f22167ce5dd8baaa9b3c15c1335_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        $__internal_603dd69c116138e73440fa50285ed8d49d7ca674c4d73e9c67d8247cd102585b = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_603dd69c116138e73440fa50285ed8d49d7ca674c4d73e9c67d8247cd102585b->enter($__internal_603dd69c116138e73440fa50285ed8d49d7ca674c4d73e9c67d8247cd102585b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_348568cc1569bfb40f141e2c1a613db94a5c4c1b64b42e1c3dca188b3a38f094 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_348568cc1569bfb40f141e2c1a613db94a5c4c1b64b42e1c3dca188b3a38f094->enter($__internal_348568cc1569bfb40f141e2c1a613db94a5c4c1b64b42e1c3dca188b3a38f094_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

        
        $__internal_348568cc1569bfb40f141e2c1a613db94a5c4c1b64b42e1c3dca188b3a38f094->leave($__internal_348568cc1569bfb40f141e2c1a613db94a5c4c1b64b42e1c3dca188b3a38f094_prof);

        
        $__internal_603dd69c116138e73440fa50285ed8d49d7ca674c4d73e9c67d8247cd102585b->leave($__internal_603dd69c116138e73440fa50285ed8d49d7ca674c4d73e9c67d8247cd102585b_prof);

    }

    // line 10
    public function block_body($context, array $blocks = array())
    {
        $__internal_42e0e7881060501957c43bbb0265c4efbb5db74fca0005bde107fb0fccd6ac02 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_42e0e7881060501957c43bbb0265c4efbb5db74fca0005bde107fb0fccd6ac02->enter($__internal_42e0e7881060501957c43bbb0265c4efbb5db74fca0005bde107fb0fccd6ac02_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        $__internal_274336ea4a239f9c46dfbaf3efd3d003e49afb002fb3c549617273a9d2600351 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_274336ea4a239f9c46dfbaf3efd3d003e49afb002fb3c549617273a9d2600351->enter($__internal_274336ea4a239f9c46dfbaf3efd3d003e49afb002fb3c549617273a9d2600351_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_274336ea4a239f9c46dfbaf3efd3d003e49afb002fb3c549617273a9d2600351->leave($__internal_274336ea4a239f9c46dfbaf3efd3d003e49afb002fb3c549617273a9d2600351_prof);

        
        $__internal_42e0e7881060501957c43bbb0265c4efbb5db74fca0005bde107fb0fccd6ac02->leave($__internal_42e0e7881060501957c43bbb0265c4efbb5db74fca0005bde107fb0fccd6ac02_prof);

    }

    // line 11
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_2e10d4ea9f42a1acc94989a6d72d9f47287612448fb991c247f816756c60c355 = $this->env->getExtension("Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension");
        $__internal_2e10d4ea9f42a1acc94989a6d72d9f47287612448fb991c247f816756c60c355->enter($__internal_2e10d4ea9f42a1acc94989a6d72d9f47287612448fb991c247f816756c60c355_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_723c45122f8add1d084c7b5d693b455827a969b6aa10151814df98df339ef722 = $this->env->getExtension("Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension");
        $__internal_723c45122f8add1d084c7b5d693b455827a969b6aa10151814df98df339ef722->enter($__internal_723c45122f8add1d084c7b5d693b455827a969b6aa10151814df98df339ef722_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        
        $__internal_723c45122f8add1d084c7b5d693b455827a969b6aa10151814df98df339ef722->leave($__internal_723c45122f8add1d084c7b5d693b455827a969b6aa10151814df98df339ef722_prof);

        
        $__internal_2e10d4ea9f42a1acc94989a6d72d9f47287612448fb991c247f816756c60c355->leave($__internal_2e10d4ea9f42a1acc94989a6d72d9f47287612448fb991c247f816756c60c355_prof);

    }

    public function getTemplateName()
    {
        return "base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  117 => 11,  100 => 10,  83 => 6,  65 => 5,  53 => 12,  50 => 11,  48 => 10,  41 => 7,  39 => 6,  35 => 5,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
        <title>{% block title %}Welcome!{% endblock %}</title>
        {% block stylesheets %}{% endblock %}
        <link rel=\"icon\" type=\"image/x-icon\" href=\"{{ asset('favicon.ico') }}\" />
    </head>
    <body>
        {% block body %}{% endblock %}
        {% block javascripts %}{% endblock %}
    </body>
</html>
", "base.html.twig", "/Applications/MAMP/htdocs/GustoCoffee/GustoCoffee/app/Resources/views/base.html.twig");
    }
}
