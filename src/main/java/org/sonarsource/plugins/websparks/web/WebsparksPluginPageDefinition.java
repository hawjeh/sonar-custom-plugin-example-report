package org.sonarsource.plugins.websparks.web;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.PageDefinition;
import static org.sonar.api.web.page.Page.Scope.COMPONENT;

public class WebsparksPluginPageDefinition implements PageDefinition {

  @Override
  public void define(Context context) {
    context
      .addPage(Page.builder("websparks/custom_report_page")
        .setName("Custom Report")
        .setScope(COMPONENT)
        .build());
  }
}
