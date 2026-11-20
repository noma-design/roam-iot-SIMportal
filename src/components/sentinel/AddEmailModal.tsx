"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

type AddEmailModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (email: string) => void;
};

export function AddEmailModal({ open, onClose, onAdd }: AddEmailModalProps) {
  const [email, setEmail] = useState("");

  return (
    <Modal open={open} title="Add Email to Distribution List" onClose={onClose}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const value = email.trim();
          if (!value) return;
          onAdd(value);
          setEmail("");
          onClose();
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          className="w-full rounded border border-[#ccc] px-3 py-3 text-base text-roam-navy outline-none placeholder:text-roam-placeholder focus:border-roam-teal"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full rounded border border-[#ccc] px-3 py-3 text-base text-roam-navy outline-none placeholder:text-roam-placeholder focus:border-roam-teal"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
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
