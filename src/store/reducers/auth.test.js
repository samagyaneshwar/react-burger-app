import reducer from './auth';

import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token : null,
            userId : null,
            loading : false,
            error : null,
            authRedirectPath : '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token : null,
            userId : null,
            loading : false,
            error : null,
            authRedirectPath : '/'
        }, {
            type : actionTypes.AUTH_SUCCESS,
            idToken : 'some-id',
            userId : 'some-id'
        })).toEqual({
            token : 'some-id',
            userId : 'some-id',
            loading : false,
            error : null,
            authRedirectPath : '/'
        })
    });
});