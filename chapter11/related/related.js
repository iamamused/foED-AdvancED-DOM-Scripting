ADS.addEvent(window,'load',function() {
    
    GSearch.getBranding(ADS.$("branding"));
    
    var siteSearch = new GwebSearch();
    siteSearch.setUserDefinedLabel("This Site");
    //siteSearch.setSiteRestriction("jeffreysambells.com");
    
    var blogSearch = new GblogSearch();
    blogSearch.setUserDefinedLabel("blogosphere");

    searchOptions = new GsearcherOptions();
    searchOptions.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
    searchOptions.setRoot(ADS.$("search-related"));

    searchControl = new GSearchControl();
    searchControl.addSearcher(siteSearch,searchOptions);

    var options = new GdrawOptions();
    options.setDrawMode(GSearchControl.DRAW_MODE_TABBED);
    searchControl.draw(ADS.$("search-controls"), options);

    searchControl.setResultSetSize(GSearch.SMALL_RESULTSET)
    searchControl.execute(ADS.$('keywords').innerHTML);
    
});
