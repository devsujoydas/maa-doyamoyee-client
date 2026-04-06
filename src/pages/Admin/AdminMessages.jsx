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
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";  
import useMessages from "../../hooks/useMessages";

const AdminMessages = () => { 
   const { data: messages = [] } = useMessages();


  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});

  const filtered = messages
    .filter((m) =>
      filter === "all" ? true : filter === "read" ? m.read : !m.read,
    )
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()),
    );

  const markRead = (id) => {
    
  };

  const deleteMsg = (id) => {
   
  };

  const sendReply = (id) => {
    const text = replyTexts[id];
    if (!text) return;

    alert("Reply sent: " + text);
    setReplyTexts((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {["all", "read", "unread"].map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`border border-zinc-300 shadow-sm rounded-xl p-4 ${
                msg.read ? "bg-blue-50" : "bg-[#F7F7F8]"
              }`}
            >
              {/* Top */}
              <div className="flex justify-between">
                <div className="">
                  <h2 className="font-semibold lang-en-US flex items-center gap-2">
                    {msg.name}
                    <span
                      className={`flex items-center gap-1 text-[12px] font-normal bg-[#] rounded-full px-2  w-fit
                        ${msg.read ? "text-zinc-600" : "text-[#CF4517]"}
                        ${msg.read ? "bg-[#dbdbdb]" : "bg-[#f3d1c6]"}
                        `}
                    >
                      <Mail size={10} /> {msg.read ? "Read" : "New"}
                    </span>
                  </h2>
                  <p className="text-xs mt-1 text-gray-500">
                    {msg.email} · {new Date(msg.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500"><span className="font-medium">Phone:</span> {msg.phone}</p>
                </div>

                <div className="flex gap-1">
                  {!msg.read && (
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => markRead(msg.id)}
                    >
                      <CheckCircle size={16} />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteMsg(msg.id)}
                  >
                    <Trash2 size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setExpandedId(expandedId === msg.id ? null : msg.id)
                    }
                  >
                    {expandedId === msg.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expand */}
              <AnimatePresence initial={false}>
                {expandedId === msg.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mt-4 pt-4 border-t border-zinc-300">
                        <p className="mb-3 text-zinc-700 text-[14px]">
                          {msg.message}
                        </p>

                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your reply..."
                            value={replyTexts[msg.id] || ""}
                            onChange={(e) =>
                              setReplyTexts((prev) => ({
                                ...prev,
                                [msg.id]: e.target.value,
                              }))
                            }
                          />

                          <Button onClick={() => sendReply(msg.id)}>
                            <Send size={14} /> Reply
                          </Button>
                        </div>
                      </div>
                    </motion.div>
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
