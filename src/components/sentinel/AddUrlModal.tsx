"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

type AddUrlModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (url: string) => void;
};

export function AddUrlModal({ open, onClose, onAdd }: AddUrlModalProps) {
  const [url, setUrl] = useState("");

  return (
    <Modal open={open} title="Add URL to Distribution List" onClose={onClose}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const value = url.trim();
          if (!value) return;
          onAdd(value);
          setUrl("");
          onClose();
        }}
      >
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="w-full rounded border border-[#ccc] px-3 py-3 text-base text-roam-navy outline-none placeholder:text-roam-placeholder focus:border-roam-teal"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-roam-navy px-5 py-2.5 text-sm font-medium text-white shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
        >
          Add
        </button>
      </form>
    </Modal>
  );
}
