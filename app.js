var UIController = (function () {
    var Selectors = {
        searchInput: '#searchInput',
        searchForm: '#searchForm',
        warning: '#warning',
        profile: '#profile'
    };

    var searchInput = document.querySelector(Selectors.searchInput);
    var profile = document.querySelector(Selectors.profile);
    var warning = document.querySelector(Selectors.warning);

    function getSearchInput() {
        return searchInput;
    }

    function getSelectors() {
        return Selectors;
    }

    function getSearchValue() {
        return searchInput.value;
    }

    function setWarning(bool) {
        if(bool && !(searchInput.value === '')) {
            warning.classList.remove('invisible');
        } else {
            warning.classList.add('invisible');
        }
    }

    function setUserInfo(user) {
        var html = `
        <div class="card">
        <div class="card-header">Searched User</div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <img class="img-thumbnail" src="https://via.placeholder.com/200x200" width="100%" alt="">
                </div>
                <div class="col-md-8">
                    <h5 class="h1">${user.name}</h5><hr>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Username : </strong> ${user.username}</li>
                        <li class="list-group-item"><strong>Email : </strong> ${user.email}</li>
                        <li class="list-group-item"><strong>Phone : </strong> ${user.phone}</li>
                        <li class="list-group-item"><strong>Website : </strong> ${user.website}</li>
                        <li class="list-group-item"><strong>City : </strong> ${user.address.city}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
        `;

        profile.innerHTML = html;
    }

    function clearUserInfo() {
        profile.innerHTML = '';
    }

    return {
        getSelectors,
        getSearchValue,
        getSearchInput,
        setUserInfo,
        clearUserInfo,
        setWarning
    }
})();

var FetchController = (function () {
    var url = 'https://jsonplaceholder.typicode.com/users?username=';



    async function getUserData(username) {
        try {
            var response = await fetch(url + username);
            return await response.json();
        } catch(exception) {
            console.log(exception);
            return null;
        }
    }

    return {
        getUserData
    }
})();


var App = (function (UIController, FetchController) {
    
    function init() {
        UIController.getSearchInput().addEventListener('keyup', async function() {
            data = await FetchController.getUserData(UIController.getSearchValue());

            if(data.length > 0) {
                UIController.setUserInfo(data[0]);
                UIController.setWarning(false);
            } else {
                UIController.clearUserInfo();
                UIController.setWarning(true);
            }
        });
    }

    return {
        init
    }
    
})(UIController, FetchController);

App.init();


