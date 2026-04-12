import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Mail,
} from "lucide-react";

import Button from "../../components/ui/Button";
import useMessages from "../../hooks/useMessages";
import toast from "react-hot-toast";

const AdminMessages = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});

  // ✅ API CONNECTED
  const { messages, markRead, deleteMsg, reply } = useMessages({
    search,
    status: filter === "all" ? "" : filter,
  });

  // ✅ HANDLERS
  const markReadHandler = async (id) => {
    await markRead(id);
    toast.success("Read");
  };

  const deleteHandler = async (id) => {
    await deleteMsg(id);
    toast.success("Message delete successfully");
  };

  const sendReply = async (id) => {
    const text = replyTexts[id];
    if (!text) return;

    await reply({ id, message: text });
    toast.success("Reply send successfully");
    setReplyTexts((prev) => ({ ...prev, [id]: "" }));
  };

  const filtered = messages.filter((m) => {
    if (filter === "read") return m.isRead;
    if (filter === "unread") return !m.isRead;
    return true;
  });

  return (
    <div>
      <h1 className="text-lg md:text-2xl  font-bold mb-6">Contact Messages</h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 flex items-center px-4  border rounded-md border-zinc-300 ">
          <Search className=" " size={16} />
          <input
            placeholder="Search messages..."
            className="pl-3 py-2 h-full outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {["all", "read", "unread"].map((f) => (
          <button
            className={`px-3 py-1 rounded-full border border-zinc-200 cursor-pointer ${
              filter === f ? "bg-black text-white" : ""
            }`}
            key={f}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((msg) => (
            <motion.div
              key={msg._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`border border-zinc-300 shadow-sm rounded-xl p-4 ${
                msg.isRead ? "bg-blue-50" : "bg-[#F7F7F8]"
              }`}
            >
              {/* Top */}
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold flex items-center gap-2">
                    {msg.name}
                    <span
                      className={`flex items-center gap-1 text-[12px] font-normal rounded-full px-2
                      ${
                        msg.isRead
                          ? "text-zinc-600 bg-[#dbdbdb]"
                          : "text-[#CF4517] bg-[#f3d1c6]"
                      }`}
                    >
                      <Mail size={10} /> {msg.isRead ? "Read" : "New"}
                    </span>
                  </h2>

                  <p className="text-xs mt-1 text-gray-500">
                    {msg.email} · {new Date(msg.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Phone:</span>{" "}
                    {msg.phone || "N/A"}
                  </p>
                </div>

                <div className="flex gap-1">
                  {!msg.isRead && (
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => markReadHandler(msg._id)}
                    >
                      <CheckCircle size={16} />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteHandler(msg._id)}
                  >
                    <Trash2 size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setExpandedId(expandedId === msg._id ? null : msg._id)
                    }
                  >
                    {expandedId === msg._id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expand */}
              <AnimatePresence>
                {expandedId === msg._id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-zinc-300">
                      <p className="mb-3 text-zinc-700 text-[14px]">
                        {msg.message}
                      </p>

                      {/* ✅ Reply History */}
                      {msg.replies?.length > 0 && (
                        <div className="mb-3 space-y-2">
                          {msg.replies.map((r, i) => (
                            <div
                              key={i}
                              className="bg-green-100 p-2 rounded text-sm"
                            >
                              <strong>Reply:</strong> {r.message}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <textarea
                          className="input-field"
                          placeholder="Type your reply..."
                          value={replyTexts[msg._id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({
                              ...prev,
                              [msg._id]: e.target.value,
                            }))
                          }
                        />

                        <button
                          className="btn-primary h-fit"
                          onClick={() => sendReply(msg._id)}
                        >
                          <Send size={14} /> Reply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminMessages;
