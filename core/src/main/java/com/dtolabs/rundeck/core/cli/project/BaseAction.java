/*
 * Copyright 2010 DTO Labs, Inc. (http://dtolabs.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.dtolabs.rundeck.core.cli.project;

import com.dtolabs.rundeck.core.Constants;
import com.dtolabs.rundeck.core.cli.Action;
import com.dtolabs.rundeck.core.cli.CLIToolLogger;
import com.dtolabs.rundeck.core.common.Framework;
import com.dtolabs.rundeck.core.common.FrameworkProject;
import com.dtolabs.rundeck.core.common.FrameworkResource;
import com.dtolabs.rundeck.core.common.IFramework;
import com.dtolabs.rundeck.core.dispatcher.CentralDispatcher;
import org.apache.commons.cli.CommandLine;

import java.io.File;

/**
 * Base class for implementing project setup actions
 */
public class BaseAction implements Action {

    final protected CLIToolLogger main;
    final protected IFramework framework;
    private boolean verbose=false;

    protected String project;
    private CentralDispatcher centralDispatcher;

    public BaseAction(final CLIToolLogger main, final IFramework framework, final CommandLine cli) {
        this(main, framework, parseBaseActionArgs(cli));
    }

    public BaseAction(final CLIToolLogger main, final IFramework framework, final BaseActionArgs args) {
        if (null == main) {
            throw new NullPointerException("main parameter was null");
        }
        if (null == args) {
            throw new NullPointerException("args parameter was null");

        }
        this.main = main;
        this.framework = framework;
        initArgs(args);
    }

    public boolean isVerbose() {
        return verbose;
    }

    public void setVerbose(boolean verbose) {
        this.verbose = verbose;
    }

    protected static BaseActionArgs parseBaseActionArgs(CommandLine cli){               
        final String project = cli.getOptionValue('p');
        // validate that project name is just alpha-numeric
        if (null != project
                && !project.matches(FrameworkResource.VALID_RESOURCE_NAME_REGEX)) {
           throw new ProjectToolException(
                   "Error: CreateAction: project names can only contain these characters: "
                           + FrameworkResource.VALID_RESOURCE_NAME_REGEX);
        }
        return createArgs(project, cli.hasOption('v'));
    }

    /**
     * Create BaseActionArgs instance
     * @param project project name
     * @param verbose true if verbose output is on
     * @return args instance
     */
    public static BaseActionArgs createArgs(final String project, final boolean verbose){
        return new BaseActionArgs(){
            public String getProject() {
                return project;
            }

            public boolean isVerbose() {
                return verbose;
            }
        };

    }

    public CentralDispatcher getCentralDispatcher() {
        return centralDispatcher;
    }

    public void setCentralDispatcher(final CentralDispatcher centralDispatcher) {
        this.centralDispatcher = centralDispatcher;
    }


    /**
     * Arguments for the BaseAction.
     */
    public static interface BaseActionArgs{
        /**
         * @return Name of project to use
         *
         */
        public String getProject();

        /**
         * @return true to turn verbose logging on.
         */
        public boolean isVerbose();
    }

    private void initArgs(BaseActionArgs args) {
        if (null != args.getProject()) {
            project = args.getProject();
        } else if (null == args.getProject() &&
                framework.getFrameworkProjectMgr().listFrameworkProjects().size() == 1) {
            final FrameworkProject d = (FrameworkProject) framework.getFrameworkProjectMgr().listFrameworkProjects().iterator().next();
            project = d.getName();
            main.log("defaulting to project: " + d.getName());
        } else {
            throw new InvalidArgumentsException("-p option not specified");
        }
        verbose = args.isVerbose();
    }



    /**
     * Execute the action.  Currently checks if installation is valid.
     *
     * @throws Throwable any throwable
     */
    public void exec() throws Throwable {
    }


}
