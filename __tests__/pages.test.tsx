import { CodeSnippet } from "@prisma/client";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "cross-fetch/polyfill";

import Home from "@/pages";

import axios from "axios";
jest.mock("axios");

const push = jest.fn();
jest.mock("next/router", () => {
  const router = jest.requireActual("next/router");
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

describe("index", () => {
  describe("一覧画面", () => {
    let mockData: CodeSnippet[];

    beforeEach(() => {
      jest.resetAllMocks();

      // axios によるデータ取得のモックを設定する
      mockData = [
        {
          id: 1,
          title: "title1",
          code: "code1",
          language: "language1",
          description: "description1",
          tags: ["tag1", "tag2"],
          createdAt: new Date("2021-10-01T00:00:00.000Z"),
          updatedAt: new Date("2021-10-01T00:00:00.000Z"),
        },
        {
          id: 2,
          title: "title2",
          code: "code2",
          language: "language2",
          description: "description2",
          tags: ["tag1", "tag2"],
          createdAt: new Date("2021-10-01T00:00:00.000Z"),
          updatedAt: new Date("2021-10-01T00:00:00.000Z"),
        },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });
      render(<Home />);
    });
    it("スニペット一覧が正常に表示される", async () => {
      const title1 = await screen.findByText("title1");
      const title2 = await screen.findByText("title2");
      expect(title1).toBeInTheDocument();
      expect(title2).toBeInTheDocument();
    });

    it("スニペット登録ボタンが正常に表示される", async () => {
      const button = await screen.findByText("Add New Snippet");
      expect(button).toBeInTheDocument();
    });
  });

  describe("スニペット登録ダイアログ", () => {
    /// スニペット登録ダイアログを開く
    const openDialog = async () => {
      const button = await screen.findByText("Add New Snippet");
      await userEvent.click(button);
    };

    beforeEach(async () => {
      jest.resetAllMocks();
      // 空のモックデータを設定する
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: [],
      });

      render(<Home />);
      await openDialog();
    });

    it("ダイアログが開く", async () => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("ダイアログを閉じることが出来る", async () => {
      // ダイアログを閉じる
      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      await userEvent.click(cancelButton);
      // ダイアログがアニメーションで閉じるのを待つ
      await new Promise((r) => setTimeout(r, 500));
      // ダイアログ要素がないことを確認する
      const dialog = screen.queryByRole("dialog");
      expect(dialog).not.toBeInTheDocument();
    });

    it("全フォームが正常にレンダリングされる", async () => {
      // フォーム要素が存在することを確認する
      const titleInput = screen.getByLabelText("Title");
      const codeInput = screen.getByTestId("code-editor");
      const languageInput = screen.getByLabelText("Language");
      const descriptionInput = screen.getByLabelText("Description");
      const tagsInput = screen.getByLabelText("Tags");

      // 各フォーム要素が表示されていることを確認する
      expect(titleInput).toBeInTheDocument();
      expect(codeInput).toBeInTheDocument();
      expect(languageInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(tagsInput).toBeInTheDocument();
    });
  });
});
