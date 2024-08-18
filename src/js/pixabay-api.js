import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

let raiseEmptySearchCriteria = () => {
    iziToast.show({
        message: `Fill search field`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
}

let raiseEmptyResponse = () => {
    iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
}

export function raiseReachedEnd() {
    iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        position: "topRight",
        backgroundColor: 'rgb(250,128,114)',
        messageColor: 'rgb(255,255,255)'
    });
}

export async function loadData(searchText, callbackOnSuccess, callbackOnError, callOnFinally, currentPage = 1) {
    if (searchText === null || searchText === "") {
        raiseEmptySearchCriteria();
        callOnFinally();
        return;
    }

    try {
        let response = await axios({
            method: 'get',
            url: 'https://pixabay.com/api/?',
            params: {
                key: '45339856-2e70ead6ce9cf82bdbbd89c7e',
                q: searchText,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page: currentPage
            }
        });

        if (response.data.hits.length > 0) {
            callbackOnSuccess(response.data);
        } else {
            raiseEmptyResponse();
        }

    } catch (error) {
        callbackOnError(error)
    } finally {
        callOnFinally();
    }
}