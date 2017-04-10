import test from 'ava';
// inject window, document etc.
import 'jsdom-global/register';
import * as installCE from 'document-register-element/pony';
declare let global;
installCE(global, 'force');
import {VerticalLayout} from '../src/models/uischema';
import {VerticalLayoutRenderer, verticalLayoutTester}
  from '../src/renderers/layouts/vertical.layout';
import {Runtime} from '../src/core/runtime';


test('VerticalLayoutRendererTester', t => {
  t.is(
      verticalLayoutTester(undefined, undefined),
      -1
  );
  t.is(
      verticalLayoutTester(null, undefined),
      -1
  );
  t.is(
      verticalLayoutTester({type: 'Foo'}, undefined),
      -1
  );
  t.is(
      verticalLayoutTester({type: 'VerticalLayout'}, undefined),
      1
  );
});
test('VerticalLayoutRenderer with elements undefined', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  renderer.setUiSchema({type: 'VerticalLayout'} as VerticalLayout);
  const result = renderer.render();
  t.is(result.childNodes.length, 1);
  const div = result.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(div.children.length, 0);
});
test('VerticalLayoutRenderer with elements null', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  renderer.setUiSchema({type: 'VerticalLayout', elements: null} as VerticalLayout);
  const result = renderer.render();
  t.is(result.childNodes.length, 1);
  const div = result.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(div.children.length, 0);
});
test('VerticalLayoutRenderer with Children', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  renderer.setUiSchema({type: 'VerticalLayout',
    elements: [{type: 'Control'}, {type: 'Control'}]} as VerticalLayout);
  const result = renderer.render();
  t.is(result.childNodes.length, 1);
  const div = result.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(div.children.length, 2);
});
test('VerticalLayoutRenderer notify visible', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  const verticalLayout = {type: 'VerticalLayout', elements: [{type: 'Control'}]} as VerticalLayout;
  renderer.setUiSchema(verticalLayout);
  renderer.connectedCallback();
  const runtime = <Runtime>verticalLayout['runtime'];
  runtime.visible = false;
  t.is(renderer.childNodes.length, 1);
  const div = renderer.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(renderer.hidden, true);
});
test('VerticalLayoutRenderer notify disabled', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  const verticalLayout = {type: 'VerticalLayout', elements: [{type: 'Control'}]} as VerticalLayout;
  renderer.setUiSchema(verticalLayout);
  renderer.connectedCallback();
  const runtime = <Runtime>verticalLayout['runtime'];
  runtime.enabled = false;
  t.is(renderer.childNodes.length, 1);
  const div = renderer.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(div.getAttribute('disabled'), 'true');
});
test('VerticalLayoutRenderer notify enabled', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  const verticalLayout = {type: 'VerticalLayout', elements: [{type: 'Control'}]} as VerticalLayout;
  renderer.setUiSchema(verticalLayout);
  renderer.connectedCallback();
  const runtime = <Runtime>verticalLayout['runtime'];
  runtime.enabled = true;
  t.is(renderer.childNodes.length, 1);
  const div = renderer.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.false(div.hasAttribute('disabled'));
});
test('VerticalLayoutRenderer disconnected no notify visible', t => {
  const renderer: VerticalLayoutRenderer = new VerticalLayoutRenderer();
  const verticalLayout = {type: 'VerticalLayout', elements: [{type: 'Control'}]} as VerticalLayout;
  renderer.setUiSchema(verticalLayout);
  renderer.connectedCallback();
  renderer.disconnectedCallback();
  const runtime = <Runtime>verticalLayout['runtime'];
  runtime.visible = false;
  t.is(renderer.childNodes.length, 1);
  const div = renderer.children[0];
  t.is(div.tagName, 'DIV');
  t.is(div.className, 'vertical-layout');
  t.is(renderer.hidden, false);
});