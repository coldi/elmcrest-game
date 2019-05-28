import React from 'react';
import { mount } from 'enzyme';
import { setCurrentStrings } from '../../modules/i18n/locales';
import T from './';

jest.mock('./Provider', () => ({
    I18nContext: {
        Consumer: props => props.children({ lang: 'en' }),
    },
}));

describe('views/i18n', () => {
    let renderedElement;

    const strings = {
        hello: 'Hello, {0}!',
        helloParam: 'Hello, {param}!',
        nested: {
            hello: 'Hello, Nested!',
        },
    };

    const renderComponent = element => {
        renderedElement = mount(element).find(T);
    };

    beforeEach(() => {
        setCurrentStrings(strings);
    });

    describe('Given <T> uses a child translation key', () => {
        beforeEach(() => {
            renderComponent(<T>nested.hello</T>);
        });

        it('should translate the correct string', () => {
            expect(renderedElement.text()).toBe(strings.nested.hello);
        });

        it.skip('should not wrap the text result in another element', () => {
            expect(renderedElement.children().length).toBe(0);
        });
    });

    describe('Given <T> uses the string prop translation key', () => {
        beforeEach(() => {
            renderComponent(<T string="nested.hello" />);
        });

        it('should translate the correct string', () => {
            expect(renderedElement.text()).toBe(strings.nested.hello);
        });

        it.skip('should not wrap the text result in another element', () => {
            expect(renderedElement.children().length).toBe(0);
        });

        describe('Given <T> passes param(s) to the translation string', () => {
            beforeEach(() => {
                renderComponent(<T string="helloParam" params={{ param: 'Test' }} />);
            });

            it('should translate the correct string with param', () => {
                expect(renderedElement.text()).toBe('Hello, Test!');
            });

            describe('Given <T> passes a numeric param with <T.place /> to the translation string', () => {
                beforeEach(() => {
                    renderComponent(
                        <T string="hello">
                            <T.place forKey={0}>
                                <em>Child</em>
                            </T.place>
                        </T>
                    );
                });

                it('should translate the correct string with children', () => {
                    expect(renderedElement.text()).toBe('Hello, Child!');
                });
            });
        });
    });

    describe('Given <T> uses additional element props', () => {
        beforeEach(() => {
            renderComponent(<T className="test">nested.hello</T>);
        });

        it('should wrap the text result in a <span> element', () => {
            expect(renderedElement.children().length).toBe(1);
            expect(renderedElement.find('span.test').length).toBe(1);
        });
    });

    describe('Given <T> uses an element as child', () => {
        beforeEach(() => {
            renderComponent(
                <T>
                    <div>Element</div>
                </T>
            );
        });

        it('should show element content w/o translation', () => {
            expect(renderedElement.text()).toBe('Element');
        });
    });
});
