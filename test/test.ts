import { Expect, Test } from "alsatian";
import * as _ from "lodash";

export class ExampleTestFixture {
  @Test("Confirm 1 + 1 is 2")
  public test1() {
    Expect(1 + 1).toBe(2);
	_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
  }
}