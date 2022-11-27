import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // Case: Request going to server-side

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // Case: Request coming from client/browser
        return axios.create({
            baseURL: '/'
        });
    }
};