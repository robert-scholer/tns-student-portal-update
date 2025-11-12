if (window.jQuery) {
  (function ($) {
    $(async function () {
            let configUrls = [];
            try {
                const configUrl = await loadRecords('cr7d6_urlconfigurations');
                configUrls = configUrl;
            } catch (err) {
                if(err.status != 403) {
                    $("#failureMasterDialogBody p").html('something went wrong! please contact support.');
                    $("#failureMasterDialog").modal("show");
                }
                configUrls = [];
            }
            window.redirectToShop = function (link) {
                $('#loader').show();
                const url = configUrls.find(item => item['cr7d6_linktext'] === 'wordpress_url')['cr7d6_url'];
                const email = '{{user.emailaddress1}}';
                fetch(
                    `${url}/?rest_route=/simple-jwt-login/v1/auth&password=tns2024&email=${email}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                ).then((response) => response.json()).then((data) => {
                        if (data.success) {
                            const url = configUrls.find(item => item['cr7d6_linktext'] === 'wordpress_url')['cr7d6_url'];
                            $('#loader').hide();
                            window.open(
                                `${url}/?rest_route=/simple-jwt-login/v1/autologin&JWT=${data.data.jwt}&redirectUrl='${link ? link : `${url}/shop`}'`
                            );
                        } else {
                            $('#loader').hide();
                            $("#failureMasterDialogBody p").html('something went wrong! please contact support.');
                            $("#failureMasterDialog").modal("show");
                        }
                    })
                    .catch((error) => {
                        $('#loader').hide();
                        $("#failureMasterDialogBody p").html('something went wrong! please contact support.');
                        $("#failureMasterDialog").modal("show");
                    });
            }
    });
  })(window.jQuery);
}
