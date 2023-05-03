import SnippetRegisterDialog from "@/components/SnippetRegisterDialog";
import TextField from "@/components/input/base/TextField";
import { render, screen } from "@testing-library/react";

describe("components", () => {
  describe("input", () => {
    describe("base", () => {
      describe("TextField", () => {
        it("ラベルが正常に表示される", () => {
          render(<TextField label="Title" />);
          expect(screen.getByLabelText("Title")).toBeTruthy();
        });
      });
    });
  });

  describe("SnippetRegisterDialog", () => {
    it("スニペット登録ダイアログが正常に表示される", () => {
      render(<SnippetRegisterDialog open={true} onClose={() => {}} />);
      expect(screen.getByText("スニペット登録")).toBeTruthy();
    });

    it("スニペット登録ダイアログが正常に表示されない", () => {
      render(<SnippetRegisterDialog open={false} onClose={() => {}} />);
      expect(screen.queryByText("スニペット登録")).toBeNull();
    });
  });
});
