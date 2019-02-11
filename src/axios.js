import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://022design.com/wordpress/wp-json/wp/v2'
})
export default instance