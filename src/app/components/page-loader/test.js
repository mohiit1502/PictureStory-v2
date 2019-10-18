import React from 'react'
import {shallow} from 'enzyme'
import {PageLoader} from './index'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import sinon from 'sinon'

test('PageLoader renders a Skeleton', () => {
    const wrapper = shallow(<PageLoader />)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find(SkeletonBlock).length).toBe(1)
})

test('PageLoader renders a DangerousHTML', () => {
    const wrapper = shallow(<PageLoader error={new Error('offline')} />)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find(SkeletonBlock).length).toBe(0)
    expect(wrapper.find(DangerousHTML).length).toBe(1)
    expect(wrapper.find('div.c-page-loader__offline > p').length).toBe(1)
})

test('PageLoader retries to load component on failure', () => {
    const retry = sinon.stub().returns(Promise.resolve())
    const wrapper = shallow(
        <PageLoader error={new Error('offline')} retry={retry} offlineModeStartTime={123} />
    )

    expect(retry.called).toBe(false)
    wrapper.setProps({offlineModeStartTime: null})
    expect(retry.called).toBe(true)
})
