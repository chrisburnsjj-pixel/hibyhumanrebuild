import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadMediaImage } from '../../firebase/storage';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectRatioHint?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  folder = 'cms-images',
  aspectRatioHint = 'Recommended: 16:9 or 4:3 high-res',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const asset = await uploadMediaImage(file, folder);
      onChange(asset.downloadUrl);
      setUrlInput(asset.downloadUrl);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError(err?.message || 'Upload failed. Please try again or paste image URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`text-[10px] px-2 py-0.5 rounded font-mono transition cursor-pointer ${
              mode === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`text-[10px] px-2 py-0.5 rounded font-mono transition cursor-pointer ${
              mode === 'url'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className={`flex flex-col items-center justify-center border border-dashed rounded-xl p-4 transition-all cursor-pointer ${
              isUploading
                ? 'border-cyan-500/50 bg-cyan-950/20 cursor-wait'
                : 'border-slate-700 bg-slate-900/60 hover:border-cyan-400/50 hover:bg-slate-800/40'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2 text-cyan-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs font-mono">Uploading to Firebase Storage...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 py-2 text-slate-400">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-medium text-slate-200">
                  Click or drag image to upload
                </span>
                <span className="text-[10px] text-slate-500">{aspectRatioHint}</span>
              </div>
            )}
          </label>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
          >
            Set URL
          </button>
        </div>
      )}

      {uploadError && <p className="text-[11px] text-red-400 font-mono">{uploadError}</p>}

      {/* Image Preview Card */}
      {value && (
        <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900/80 p-2 flex items-center gap-3">
          <img
            src={value}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-lg border border-slate-800 shrink-0 bg-slate-950"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex-1 min-w-0 pr-8">
            <p className="text-xs font-semibold text-white truncate">{value}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <Check className="w-3 h-3" />
              <span>Asset attached</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition cursor-pointer"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
