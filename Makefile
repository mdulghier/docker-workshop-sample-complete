APPS = web worker
APPS_INSTALL = $(APPS:%=install-%)
APPS_CLEAN = $(APPS:%=clean-%)
APPS_BUILD = $(APPS:%=build-%)
APPS_ALL = $(APPS:%=all-%)
APPS_RUN = $(APPS:%=run-%)
APPS_STOP = $(APPS:%=stop-%)

.PHONY: all install clean build $(APPS) $(APPS_INSTALL) $(APPS_CLEAN) $(APPS_ALL) $(APPS_BUILD) $(APPS_RUN) $(APPS_STOP)

all: $(APPS_ALL)

$(APPS_ALL):
	@$(MAKE) -C services/$(@:all-%=%) all

install: $(APPS_INSTALL)

$(APPS_INSTALL):
	@$(MAKE) -C services/$(@:install-%=%) install

clean: $(APPS_CLEAN)

$(APPS_CLEAN):
	@$(MAKE) -C services/$(@:clean-%=%) clean

build: $(APPS_BUILD)

$(APPS_BUILD):
	@$(MAKE) -C services/$(@:build-%=%) build

run-all: $(APPS_RUN)

$(APPS_RUN):
	@$(MAKE) -C services/$(@:run-%=%) run-bg


stop-all: $(APPS_STOP)

$(APPS_STOP):
	@$(MAKE) -C services/$(@:stop-%=%) stop
