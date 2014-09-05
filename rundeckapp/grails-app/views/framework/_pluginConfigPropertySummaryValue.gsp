%{--
  - Copyright 2011 DTO Solutions, Inc. (http://dtosolutions.com)
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -        http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  --}%
<%--
   _pluginConfigPropertyValue.gsp

   Author: Greg Schueler <a href="mailto:greg@dtosolutions.com">greg@dtosolutions.com</a>
   Created: 7/28/11 12:03 PM
--%>
<%@ page import="com.dtolabs.rundeck.core.plugins.configuration.StringRenderingConstants" contentType="text/html;charset=UTF-8" %>

<g:if test="${prop.type.toString()=='Boolean'}">
    <g:if test="${values[prop.name]=='true'}">
        <span class="configpair">
            <span title="${enc(attr:prop.description)}"><g:enc>${prop.title?:prop.name}</g:enc>:</span>
            <span class="text-success">Yes</span>
        </span>
    </g:if>
</g:if>
<g:elseif test="${prop.renderingOptions?.(StringRenderingConstants.DISPLAY_TYPE_KEY) == StringRenderingConstants.DisplayType.PASSWORD}">
    <g:if test="${values[prop.name]}">
    <span class="configpair">
        <span title="${enc(attr:prop.description)}"><g:enc>${prop.title?:prop.name}</g:enc>:</span>
        <span class="text-success">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
    </span>
    </g:if>
</g:elseif>
<g:elseif test="${values[prop.name]}">
    <span class="configpair">
        <span title="${enc(attr:prop.description)}"><g:enc>${prop.title?:prop.name}</g:enc>:</span>
        <span class="text-success"><g:enc>${values[prop.name]}</g:enc></span>
    </span>
</g:elseif>
