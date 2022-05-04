package org.sonarsource.plugins.websparks;

import org.sonar.api.Plugin;
import org.sonarsource.plugins.websparks.web.WebsparksPluginPageDefinition;

public class WebsparksPlugin implements Plugin {

  @Override
  public void define(Context context) {
    context.addExtension(WebsparksPluginPageDefinition.class);
  }
}
