(function () {
    const listContainers = [...document.querySelectorAll('.ez-sil')];
    const mfuContainer = document.querySelector('#ez-mfu')
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const mfuAttrs = {
            adminUiConfig: {
                ...window.eZ.adminUiConfig,
            token,
            siteaccess
        },
        parentInfo: {
        contentTypeIdentifier: mfuContainer.dataset.parentContentTypeIdentifier,
            contentTypeId: mfuContainer.dataset.parentContentTypeId,
            locationPath: mfuContainer.dataset.parentLocationPath,
            language: mfuContainer.dataset.parentContentLanguage
        },
    };

    listContainers.forEach(container => {
        ReactDOM.render(React.createElement(SubItems.default, {
            startingLocationId: container.dataset.location,
            restInfo: {token, siteaccess},
            extraActions: [{
                component: MultiFileUpload.default,
                attrs: Object.assign({}, mfuAttrs, {
                    onPopupClose: (itemsUploaded) => {
                        if (itemsUploaded.length) {
                            window.location.reload(true);
                        }
                    },
                    popupOnly: false,
                    asButton: true
                })
            }]
        }), container);
    });
})();